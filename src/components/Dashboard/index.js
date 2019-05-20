import React from 'react'

const Dashboard = ({ user }) => (
  <div id='dashboard'>
    <p>{user.username} is signed in.</p>
  </div>
)

export default Dashboard
