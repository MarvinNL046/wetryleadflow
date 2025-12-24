#!/bin/bash
# QStash Local Development Helper
# ================================
# Usage: ./scripts/qstash-local.sh [start|stop|status]

QSTASH_LOCAL_PORT=8080

case "$1" in
  start)
    echo "🚀 Starting QStash local dev server..."
    echo ""
    echo "📋 Copy these to your .env.local:"
    echo "----------------------------------------"
    echo 'QSTASH_URL="http://localhost:8080"'
    echo 'QSTASH_TOKEN="eyJVc2VySUQiOiJkZWZhdWx0VXNlciIsIlBhc3N3b3JkIjoiZGVmYXVsdFBhc3N3b3JkIn0="'
    echo 'QSTASH_CURRENT_SIGNING_KEY="sig_7kYjw48mhY7kAjqNGcy6cr29RJ6r"'
    echo 'QSTASH_NEXT_SIGNING_KEY="sig_5ZB6DVzB1wjE8S6rZ7eenA8Pdnhs"'
    echo "----------------------------------------"
    echo ""
    echo "Then restart your Next.js dev server!"
    echo ""
    npx @upstash/qstash-cli dev -port=$QSTASH_LOCAL_PORT
    ;;

  docker)
    echo "🐳 Starting QStash via Docker..."
    docker run -p $QSTASH_LOCAL_PORT:8080 public.ecr.aws/upstash/qstash:latest qstash dev
    ;;

  status)
    if curl -s http://localhost:$QSTASH_LOCAL_PORT/health > /dev/null 2>&1; then
      echo "✅ QStash local server is running on port $QSTASH_LOCAL_PORT"
    else
      echo "❌ QStash local server is not running"
    fi
    ;;

  *)
    echo "QStash Local Development Helper"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  start   - Start QStash local dev server (npx)"
    echo "  docker  - Start QStash via Docker"
    echo "  status  - Check if local server is running"
    echo ""
    echo "After starting, update your .env.local with the local credentials."
    echo "See .env.qstash-local for the values."
    ;;
esac
