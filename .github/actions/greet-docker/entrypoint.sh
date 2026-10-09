#!/bin/sh
# entrypoint.sh — the body of the "Greet (Docker)" action.
#
# Two ways the input reaches us, both shown:
#   * $1            -> from `args:` in action.yml (positional)
#   * $INPUT_WHO    -> every `with:` input is also exported as INPUT_<NAME>
set -e

WHO="${1:-${INPUT_WHO:-world}}"
GREETING="Hello from inside a container, ${WHO}!"

echo "$GREETING"
echo "Running as: $(whoami) on $(cat /etc/alpine-release 2>/dev/null && echo alpine)"

# Set an output the same way a run step does — append to the $GITHUB_OUTPUT
# file, which GitHub bind-mounts into the container.
if [ -n "$GITHUB_OUTPUT" ]; then
  echo "greeting=${GREETING}" >> "$GITHUB_OUTPUT"
fi
