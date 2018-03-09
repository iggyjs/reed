module.exports = {
  apps: [{
    name: 'reed-server',
    script: './server.js'
  }],
  deploy: {
    production: {
      user: 'ec2-user',
      host: '35.153.250.216',
      key: '~/.ssh/reed.pem',
      ref: 'origin/master',
      repo: 'git@github.com:iggyjoaquin/reed.git',
      path: '/home/ec2-user/reed/server',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}