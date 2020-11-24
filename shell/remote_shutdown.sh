#if pgrep msfconsole; then pkill msfconsole; fi
killall ruby || echo "Process was not running."
echo "Ready to run"
msfconsole -r msf_shutdown.rc
