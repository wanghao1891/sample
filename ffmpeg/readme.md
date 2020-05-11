# encode-video.c
gcc -L/Users/hao/bin/ffmpeg/lib -I/Users/hao/bin/ffmpeg/include -lavcodec encode-video.c -o out/encode-video

# transcoding.c
gcc -L/Users/hao/bin/ffmpeg/lib -I/Users/hao/bin/ffmpeg/include -lavformat -lavcodec -lavutil -lavfilter -lswscale transcoding.c -o out/transcoding
