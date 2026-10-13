#!./.venv/bin/python

import argparse
import json

from reportworm_builder.builder import Builder
from reportworm_builder.builder_cache import BuilderCache

def main():
    parser = argparse.ArgumentParser(
        prog="./scripts/gurdurr.py",
        description="Gurdurr builds Reportworm Home. Not much else to do!",
    )

    cl = parser.parse_args()

    config = {}
    try:
        with open("config.json") as file:
            config = json.loads(file.read())
    except FileNotFoundError:
        print("Could not find config.json, exiting")
        return

    try:
        with open("data/common/sites-nav-source.json") as file:
            sites_nav = json.loads(file.read())
            with open("data/common/sites-nav.json", "w") as ofile:
                ofile.write(json.dumps(sites_nav, separators=(',', ':')))
    except FileNotFoundError:
        print("Couldn't open sites-nav-source.json")

    builder = Builder(config, {})
    builder.build()

if __name__ == "__main__":
    main()
