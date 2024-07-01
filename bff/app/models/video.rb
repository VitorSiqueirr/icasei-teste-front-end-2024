require 'dotenv'
Dotenv.load
require 'httparty'

class Video
  attr_reader :id, :title, :thumbnail_url

  YOUTUBE_API_KEY = ENV['API_KEY']
  YOUTUBE_API_BASE_URL = ENV['YOUTUBE_API_URL']

  def initialize(id, title, thumbnail_url, url)
    @id = id
    @title = title
    @thumbnail_url = thumbnail_url
    @url = url
  end

  # Método para serializar o objeto Video para JSON
  def to_json(*_args)
    {
      id: @id,
      title: @title,
      thumbnail_url: @thumbnail_url,
      url: @url
    }.to_json
  end

  def self.from_json(json_string)
    data = JSON.parse(json_string)
    Video.new(data['id'], data['title'], data['thumbnail_url'], data['url'])
  end

  def self.search(query)
    url = "#{YOUTUBE_API_BASE_URL}/search?part=snippet&q=#{query}&type=video&maxResults=10&key=#{YOUTUBE_API_KEY}"
    response = HTTParty.get(url)
    response['items'].map do |item|
      Video.new(item['id']['videoId'], item['snippet']['title'], item['snippet']['thumbnails']['default']['url'], "https://www.youtube.com/watch?v=#{item['id']['videoId']}" )
    end
  end

  def self.find(video_id)
    url = "#{YOUTUBE_API_BASE_URL}/videos?part=snippet&id=#{video_id}&key=#{YOUTUBE_API_KEY}"
    response = HTTParty.get(url)

    if response['items'].any?
      item = response['items'].first
      Video.new(item['id'], item['snippet']['title'], item['snippet']['thumbnails']['default']['url'], "https://www.youtube.com/watch?v=#{item['id']}")
    else
      nil
    end
  end
end
