require 'rack/test'
require 'rspec'
require 'fakeredis'
require_relative '../app/controllers/videos_controller'

# Configure o RSpec para carregar o arquivo de teste do controller
RSpec.configure do |config|
  config.include Rack::Test::Methods

  # Configurar o FakeRedis antes de cada teste
  config.before(:each) do
    @redis = FakeRedis::Redis.new
    allow(Redis).to receive(:new).and_return(@redis)
  end

  # Limpar o FakeRedis depois de cada teste
  config.after(:each) do
    @redis.flushall
  end

  def app
    VideosController
  end
end
