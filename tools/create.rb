require 'google-search'

def create_json(id,name,total_images)
  data = '{"id":' << id.to_s << ',"name":"' << name.chop << '","pictures":' << total_images.to_s << '}'
end

def download_porno(name, path)
  item_id = 0
  Google::Search::Image.new(:query => "#{name} porno", :image_size => :large, :file_type => :jpg).each do |image|
    item_id = item_id.next
    system("wget -bq -O #{path}/photo.jpg #{image.uri}")
  end
  return item_id
end

actress_id = 0
File.open('list.txt').each do |actress_name|
  actress_id = actress_id.next
  #system("mkdir 'actresses/#{actress_id}'")

  #total_images = download_porno(actress_name, "actresses/#{actress_id}")
  #puts "==\nID:" << actress_id.to_s << "\nName: " << actress_name.chop << "\nDownloaded " << total_images.to_s << " images\n=="
  
  #total_images = %x[ls -1 actresses/#{actress_id}/| wc -l].chop.delete(' ')
  #system("echo '#{create_json(actress_id, actress_name, total_images)}' > actresses/#{actress_id}/data.json")
  
  puts '"' << actress_id.to_s << '": "' << actress_name.chop << '",'
  
end



####
# Как использовать
# 1. Запускаешь скрипт (в корне должна быть создана директория actresses и лежать list.txt)
# 2. Потом удаляешь неудачные файлы с помощь поиска файлов, которые весят 0 кб
# 3. Потом, с помощью renamer.rb переименовываешь все занаво по порядку (в качестве параметра передается адрес директории)
# 4. Раскаменчиваешь строку 24 и 25 и комментируешь строки 19, 21, 22 и запускашь снова, чтобы в каждой директории появился data.json