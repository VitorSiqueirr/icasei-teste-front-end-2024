require 'sinatra'
require 'dotenv'
Dotenv.load
require_relative 'app/controllers/videos_controller'

set :port, 4567
