require_relative 'controllers/videos_controller'

get '/videos' do
  VideosController.new.get_videos
end

get '/favorites' do
  VideosController.new.get_favorites
end

post '/favorites/:video_id' do
  VideosController.new.add_favorite(params[:video_id])
end

delete '/favorites/:video_id' do
  VideosController.new.remove_favorite(params[:video_id])
end
