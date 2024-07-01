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
  rescue Redis::ConnectionError => e
    status 500
    content_type :json
    { error: 'Internal Server Error', content: e }.to_json
  end

  # Garante que um usuário tenha um ID de sessão
  before do
    session[:user_id] ||= SecureRandom.uuid
  end

  get '/videos' do
    begin
      query = params[:q]
      if query.nil? || query.strip.empty?
        videos = []
      else
        encoded_query = URI.encode_www_form_component(query)
        videos = Video.search(encoded_query)
      end
      status 200
      content_type :json
      videos.to_json
    rescue StandardError => e
      status 500
      content_type :json
      { error: 'Internal Server Error', content: e }.to_json
    end
  end

  post '/favorites' do
    begin
      video_id = params[:video_id]
      if video_id.match?(/^[a-zA-Z0-9_-]+$/)
        # Verificar se o favorito já existe
        if redis_client.hexists("favorites:#{session[:user_id]}:#{video_id}", "data")
          status 409
          content_type :json
          { content: 'Favorites already exists', id: video_id }.to_json
        else
          # Buscar informações do vídeo usando o ID
          video_data = Video.find(video_id)

          if video_data
            # Armazenar as informações completas do vídeo no Redis como um hash
            redis_client.hset("favorites:#{session[:user_id]}:#{video_id}", "data", video_data.to_json)

            status 201
            content_type :json
            { content: 'Favorites add successfully!', id: video_id }.to_json
          else
            status 404
            content_type :json
            { error: 'Video not found' }.to_json
          end
        end
      else
        status 400
        content_type :json
        { error: 'Invalid video_id format' }.to_json
      end
    rescue Redis::CommandError => e
      status 500
      content_type :json
      { error: 'Internal Server Error', content: e }.to_json
    end
  end

  get '/favorites' do
    begin
      # Obter todos os favoritos do usuário como strings JSON
      favorites_data = redis_client.keys("favorites:#{session[:user_id]}:*").map do |key|
        redis_client.hget(key, "data") # Obter a string JSON
      end

      # Converter as strings JSON de volta para objetos Video
      favorites = favorites_data.map { |data| Video.from_json(data) }

      status 200
      content_type :json
      favorites.to_json
    rescue Redis::ConnectionError => e
      status 500
      content_type :json
      { error: 'Internal Server Error', content: e }.to_json
    end
  end

  delete '/favorites' do
    begin
      video_id = params[:video_id]
      if video_id.match?(/^[a-zA-Z0-9_-]+$/)
        redis_client.del("favorites:#{session[:user_id]}:#{video_id}")
        status 204
      else
        status 400
        content_type :json
        { error: 'Invalid video_id format' }.to_json
      end
    rescue Redis::CommandError => e
      status 500
      content_type :json
      { error: 'Internal Server Error', content: e }.to_json
    end
  end
end
