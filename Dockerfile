# Start from official Node.js version 20 image
# This is like saying "I want a computer that already has Node.js installed"
FROM node:20

# Set the working directory INSIDE the container
# All future commands will run from this folder
# Think of it as "cd /app" inside the container
WORKDIR /app

# Copy package.json first (before copying all code)
# Why? Docker caches layers - if package.json hasn't changed,
# it won't re-run npm install. Saves time!
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Now copy all our app code into the container
COPY . .

# Tell Docker our app runs on port 3000
# This is just documentation - doesn't actually open the port
EXPOSE 3000

# The command to start our app when container runs
CMD ["node", "index.js"]