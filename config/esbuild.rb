Rails.application.config.esbuild.configure do |config|
  config.entry_points = ['application.js', 'client/index.tsx']
  config.format = :esm
end 