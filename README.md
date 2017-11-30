#Read data from muse and play to osc.udp://127.0.0.1:3333
muse-io --device Muse-848C --50hz --osc osc.udp://127.0.0.1:3333

#Playback sample file
muse-player -f sample.muse -s osc.udp://127.0.0.1:3333