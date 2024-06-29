require 'dotenv'
Dotenv.load
require 'httparty'

class Video
  attr_reader :id, :title, :thumbnail_url

  YOUTUBE_API_KEY = ENV['API_KEY']
  YOUTUBE_API_BASE_URL = ENV['YOUTUBE_API_URL']

  def initialize(id, title, thumbnail_url)
    @id = id
    @title = title
    @thumbnail_url = thumbnail_url
  end

  # Método para serializar o objeto Video para JSON
  def to_json(*_args)
    {
      id: @id,
      title: @title,
      thumbnail_url: @thumbnail_url
    }.to_json
  end

  def self.search(query)
    url = "#{YOUTUBE_API_BASE_URL}/search?part=snippet&q=#{query}&type=video&key=#{YOUTUBE_API_KEY}"
    response = HTTParty.get(url)
    response['items'].map do |item|
      Video.new(item['id']['videoId'], item['snippet']['title'], item['snippet']['thumbnails']['default']['url'])
    end
  end
end
