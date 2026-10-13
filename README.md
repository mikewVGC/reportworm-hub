# Reportworm Hub

Simple central location for the full suite of Reportworm websites.

## Setup / Building

Create the venv:

```
python -m venv .venv
```

Sync all the packages:

```
uv sync
```

Run the build script:

```
./scripts/gurdurr.py
```

Start Docker:

```
docker compose up -d
```

Visit http://localhost:88/