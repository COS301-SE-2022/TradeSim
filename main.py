from apps/client import build_front
from apps/backend import build_back

front = build_front()
back = build_back()

if __name__ == '__main__':
    front.run(debug=True)
