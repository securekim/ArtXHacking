#if pgrep msfconsole; then pkill msfconsole; fi
killall ruby || echo "Process was not running."
msfconsole -r msf_shutdown.rc
