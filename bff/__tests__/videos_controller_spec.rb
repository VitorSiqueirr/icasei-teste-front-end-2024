require_relative '../app/controllers/videos_controller'
require 'rack/test'

describe VideosController do
  include Rack::Test::Methods

  def app
    VideosController
  end

  it 'returns a list of videos for a given query' do
    get '/videos?q=ruby'
    expect(last_response.status).to eq(200)
    expect(JSON.parse(last_response.body)).to be_an(Array)
  end

  it 'returns an empty array for an invalid query' do
    get '/videos?q='
    expect(last_response.status).to eq(200)
    expect(JSON.parse(last_response.body)).to eq([])
  end

  it 'returns an empty array for /favorites' do
    get '/favorites'
    expect(last_response.status).to eq(200)
    expect(JSON.parse(last_response.body)).to eq([])
  end
end
