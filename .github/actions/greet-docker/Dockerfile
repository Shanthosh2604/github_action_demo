# Dockerfile for the "Greet (Docker)" container action.
# Kept tiny on purpose: Alpine + a shell script is enough to demonstrate the
# mechanics without a heavy image.

FROM alpine:3.20

# Copy the entrypoint into the image and make it executable.
COPY entrypoint.sh /entrypoint.sh

# THE #1 ERROR YOU WILL HIT HERE — and it lies to you:
#
#     exec /entrypoint.sh: no such file or directory
#
# The script IS there. What's missing is the *interpreter*. If the file was
# saved with Windows line endings (CRLF), the shebang line reads "#!/bin/sh\r",
# so Linux goes looking for a program literally named "/bin/sh\r" and can't find
# it. Docker reports that as the entrypoint being missing.
#
# `sed` strips the trailing carriage returns so the action builds no matter
# which OS the file was edited on. (The repo's .gitattributes prevents this at
# the source; this line protects the copy in YOUR practice repo.)
RUN sed -i 's/\r$//' /entrypoint.sh && chmod +x /entrypoint.sh

# GitHub runs this when the action is used. `args:` from action.yml become the
# arguments ($1, $2, ...). Inputs are also available as INPUT_* env vars.
ENTRYPOINT ["/entrypoint.sh"]
