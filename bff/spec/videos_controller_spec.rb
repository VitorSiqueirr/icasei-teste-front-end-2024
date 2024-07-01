require_relative 'spec_helper'
require_relative '../app/controllers/videos_controller'

describe VideosController do
  describe "GET /videos" do
    context "with valid query" do
      it 'returns a list of videos' do
        get '/videos?q=ruby'
        expect(last_response.status).to eq(200)
        expect(JSON.parse(last_response.body)).to be_an(Array)
      end
    end

    context "with invalid or missing query" do
      it 'returns an empty array' do
        get '/videos?q='
        expect(last_response.status).to eq(200)
        expect(JSON.parse(last_response.body)).to eq([])

        get '/videos' # sem parâmetro q
        expect(last_response.status).to eq(200)
        expect(JSON.parse(last_response.body)).to eq([])
      end
    end
  end

  describe "GET /favorites" do
    context "when user has no favorites" do
      it 'returns an empty array' do
        get '/favorites'
        expect(last_response.status).to eq(200)
        expect(JSON.parse(last_response.body)).to eq([])
      end
    end

    context "when user has favorites" do
      it 'returns a list of favorite videos' do
        video_id_1 = 'test_video_id_1'
        video_id_2 = 'test_video_id_2'

        allow(Video).to receive(:find).with(video_id_1).and_return(Video.new(video_id_1, 'Test Title 1', 'Test Thumbnail 1', 'Test URL 1'))
        allow(Video).to receive(:find).with(video_id_2).and_return(Video.new(video_id_2, 'Test Title 2', 'Test Thumbnail 2', 'Test URL 2'))

        post '/favorites', video_id: video_id_1
        post '/favorites', video_id: video_id_2

        get '/favorites'
        expect(last_response.status).to eq(200)

        favorites = JSON.parse(last_response.body)
        expect(favorites.size).to eq(2)
        expect(favorites.map { |v| v['id'] }).to include(video_id_1, video_id_2)
      end
    end
  end

  describe 'POST /favorites' do
    context 'with valid video_id' do
      before do
        @video_id = 'test_video_id'
        allow(Video).to receive(:find).with(@video_id).and_return(Video.new(@video_id, 'Test Title', 'Test Thumbnail', 'Test URL'))
      end

      it 'adds a new favorite' do
        post '/favorites', video_id: @video_id
        expect(last_response.status).to eq(201)
        expect(JSON.parse(last_response.body)['content']).to eq('Favorites add successfully!')

        expect(@redis.keys.size).to eq(1)
        expect(@redis.hget("favorites:#{last_request.env['rack.session'][:user_id]}:#{@video_id}", 'data')).not_to be_nil
      end

      it 'returns 409 if favorite already exists' do
        post '/favorites', video_id: @video_id
        expect(last_response.status).to eq(201)

        post '/favorites', video_id: @video_id
        expect(last_response.status).to eq(409)
        expect(JSON.parse(last_response.body)['content']).to eq('Favorites already exists')
      end
    end

    context 'with invalid video_id' do
      it 'returns 400' do
        post '/favorites', video_id: 'invalid id'
        expect(last_response.status).to eq(400)
        expect(JSON.parse(last_response.body)['error']).to eq('Invalid video_id format')
      end
    end
  end

  describe 'DELETE /favorites' do
    context 'with valid video_id' do
      it 'deletes the favorite' do
        video_id = 'test_video_id'
        allow(Video).to receive(:find).with(video_id).and_return(Video.new(video_id, 'Test Title', 'Test Thumbnail', 'Test URL'))
        post '/favorites', video_id: video_id # Adicionar um favorito para poder deletar

        delete "/favorites?video_id=#{video_id}"
        expect(last_response.status).to eq(204)
        expect(@redis.keys.size).to eq(0)
      end
    end

    context 'with invalid video_id' do
      it 'returns 400' do
        delete '/favorites?video_id=invalid id'
        expect(last_response.status).to eq(400)
        expect(JSON.parse(last_response.body)['error']).to eq('Invalid video_id format')
      end
    end
  end
end
