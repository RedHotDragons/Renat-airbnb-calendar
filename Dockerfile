# Use the official image as a parent image.
FROM node:12.18.1

# Set the working directory.
WORKDIR /public

# Copy the file from your host to your current location.
COPY . /public

# Run the command inside your image filesystem.
RUN yarn install

# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 3002

# Run the specified command within the container.
CMD [ "npm", "run", "production" ]

# Copy the rest of your app's source code from your host to your image filesystem.
