require 'sinatra'
require 'sinatra/cross_origin'
require 'dotenv'
Dotenv.load
require_relative 'app/controllers/videos_controller'

set :port, 4567

configure do
  enable :cross_origin
end

before do
  response.headers['Access-Control-Allow-Origin'] = 'http://localhost:8080'
  response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With'
end

# Configurar opções específicas do CORS para a rota /videos
options '/videos' do
  response.headers["Access-Control-Allow-Methods"] = "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS"
  response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token"
  response.headers["Access-Control-Max-Age"] = "1728000"
  204 # Responda com um código de status 204 (No Content)
end
