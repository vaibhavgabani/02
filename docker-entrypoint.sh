#!/bin/sh
set -e

# Define default port mapping
DEFAULT_HOST_PORT=3010
CONTAINER_PORT=3000

# Function to check if port is published/mapped
check_port_mapping() {
  # Get the container ID
  CONTAINER_ID=$(cat /proc/self/cgroup | grep "docker" | sed 's/^.*\///' | tail -n 1)
  
  if [ -z "$CONTAINER_ID" ]; then
    # Try another method for newer Docker versions
    CONTAINER_ID=$(hostname)
  fi
  
  if [ -z "$CONTAINER_ID" ]; then
    echo "Warning: Could not determine container ID. Port mapping check may not be accurate."
    return 1
  fi
  
  # Use Docker socket to check port mappings (if available)
  if [ -S /var/run/docker.sock ]; then
    # Requires Docker socket to be mounted
    PUBLISHED_PORTS=$(docker inspect --format='{{range $p, $conf := .NetworkSettings.Ports}}{{if $conf}}{{range $conf}}{{$p}} -> {{.HostIp}}:{{.HostPort}} {{end}}{{end}}{{end}}' "$CONTAINER_ID")
    
    if [ -z "$PUBLISHED_PORTS" ]; then
      return 1
    fi
    
    echo "Container ports mapped: $PUBLISHED_PORTS"
    return 0
  else
    # No Docker socket access, try alternate method with nc
    if command -v nc >/dev/null 2>&1; then
      # Try to detect if port is exposed
      timeout 1 nc -z localhost $CONTAINER_PORT >/dev/null 2>&1
      if [ $? -eq 0 ]; then
        echo "Container port $CONTAINER_PORT appears to be accessible."
        return 0
      fi
    fi
  fi
  
  return 1
}

# Check port mapping
if ! check_port_mapping; then
  echo "
============================================================
⚠️  WARNING: PORT MAPPING ISSUE DETECTED
============================================================
Your container appears to be running without proper port mapping.
To access this application from your host, you need to map port
$CONTAINER_PORT (container) to a port on your host.

Run the container with:
  docker run -d -p $DEFAULT_HOST_PORT:$CONTAINER_PORT --name express-app vaibhavgabani/express-app:latest

Or use the provided scripts:
  Windows: run-app.ps1
  Mac/Linux: run-app.sh
============================================================
"
  # Continue anyway - we'll show warnings in the web UI
fi

# Set environment variable to indicate port mapping status
if check_port_mapping; then
  export PORT_MAPPING_OK="true"
else
  export PORT_MAPPING_OK="false"
fi

# Execute the original command (typically npm start)
exec "$@"
