#!./.venv/bin/python

import argparse
import json

from reportworm_builder.builder import Builder
from reportworm_builder.builder_cache import BuilderCache

def main():
    parser = argparse.ArgumentParser(
        prog="./scripts/gurdurr.py",
        description="Gurdurr builds Reportworm Hub. Not much else to do!",
    )

    cl = parser.parse_args()

    config = {}
    try:
        with open("config.json") as file:
            config = json.loads(file.read())
    except FileNotFoundError:
        print("Could not find config.json, exiting")
        return

    builder = Builder(config, {})
    builder.build()

if __name__ == "__main__":
    main()
