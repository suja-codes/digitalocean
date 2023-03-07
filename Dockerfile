FROM node:14

ENV PORT 8080

# Step 4.1 - Add container working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Step 4.2 - Copy npm dependencies
COPY package.json /usr/src/app/
# Step 4.3 - Install dependencies
RUN npm install
# Copy app source code
COPY . /usr/src/app
#Expose port and start application
EXPOSE 8080
CMD ["node", "index.js"]