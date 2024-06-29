require_relative '../models/video'
require 'sinatra'
require 'sinatra/base'
require 'redis'
require 'securerandom'
require 'uri'
require 'dotenv'
Dotenv.load

class VideosController < Sinatra::Base
  # Habilita o middleware de sessões
  enable :sessions
  # Configuração da sessão
  set :session_secret, ENV['SECRET_KEY']

  def redis_client
    @redis ||= Redis.new(url: 'redis://redis:6379')
  end

  # Garante que um usuário tenha um ID de sessão
  before do
    session[:user_id] ||= SecureRandom.uuid
  end

  get '/videos' do
    query = params[:q]
    encoded_query = URI.encode_www_form_component(query)
    videos = Video.search(encoded_query)
    content_type :json
    videos.to_json
  end

  post '/favorites/:video_id' do
    if video_id.match?(/^[a-zA-Z0-9]+$/)
      # Usando um conjunto (Set) no Redis para evitar duplicatas
      result = redis_client.sadd("favorites:#{session[:user_id]}", video_id)
      status(result ? 201 : 409) # 409 Conflict se já existe
    else
      status 400
      content_type :json
      { error: 'Invalid video_id format' }.to_json
    end
  end

  get '/favorites' do
    favorites = redis_client.smembers("favorites:#{session[:user_id]}") # Obtém todos os membros do conjunto
    content_type :json
    favorites.to_json
  end

  delete '/favorites/:video_id' do
    if video_id.match?(/^[a-zA-Z0-9]+$/)
      redis_client.srem("favorites:#{session[:user_id]}", video_id)
      status 204
    else
      status 400
      content_type :json
      { error: 'Invalid video_id format' }.to_json
    end
  end
end
