import http.server
import socketserver
import os
import webbrowser

PORT = 3000
DIRECTORY = os.path.join(os.path.dirname(__file__), "dist")

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

if __name__ == "__main__":
    os.chdir(os.path.dirname(__file__))
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("=" * 70)
        print(f"SyncPulse Remote SaaS Dashboard running at: http://localhost:{PORT}")
        print("=" * 70)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
