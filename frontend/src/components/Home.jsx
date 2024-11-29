import React from 'react';
import { Button, Container, Typography, Box, AppBar, Toolbar, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      {/* Header with Sign Up and Login buttons */}
      <AppBar position="fixed" sx={{ backgroundColor: 'primary.main', zIndex: 1100 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '24px', color: '#fff' }}>
            TaskManager
          </Typography>
          <div>
            <Button
              variant="text"
              sx={{ color: 'white', marginLeft: 2 }}
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              sx={{ color: 'white', marginLeft: 2 }}
              component={Link}
              to="/register"
            >
              Register
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* Hero Section (Background Image and Call-to-Action) */}
      <p
        sx={{
          background: 'url(/path/to/your/background-image.jpg) no-repeat center center',
          backgroundSize: 'cover',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          textAlign: 'center',
          padding: 4,
         
        }}
      >
        <div className='top-2'>
          <Typography variant="h2" sx={{ fontSize: '3rem', fontWeight: 700, marginBottom: 3 }}>
            Organize Your Work with TaskManager
          </Typography>
          <Typography variant="h5" sx={{ fontSize: '1.25rem', marginBottom: 4 }}>
            Stay productive, track progress, and achieve your goals efficiently.
          </Typography>
          
        </div>
      </p>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Features of TaskManager
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Feature Card 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="https://img.freepik.com/premium-vector/work-organization-task-management-people-productivity-organize-process-efficiency-stylized-characters_80590-7146.jpg" // replace with your feature image
                alt="Task Organization"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Task Organization
                </Typography>
                <Typography variant="body2">
                  Stay on top of your tasks by categorizing, tagging, and prioritizing them for optimal productivity.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Feature Card 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="https://blogimage.vantagecircle.com/content/images/2023/01/10-Smart-Ways-to-Better-Team-Collaboration-1.png" // replace with your feature image
                alt="Collaboration"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Collaboration
                </Typography>
                <Typography variant="body2">
                  Invite team members, share tasks, and collaborate in real-time to get work done faster.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature Card 3 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="https://static.vecteezy.com/system/resources/previews/013/055/209/non_2x/project-tracking-goal-tracker-task-completion-or-checklist-to-remind-project-progress-concept-businessman-project-manager-holding-big-pencil-to-check-completed-tasks-in-project-management-timeline-free-vector.jpg" // replace with your feature image
                alt="Progress Tracking"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Progress Tracking
                </Typography>
                <Typography variant="body2">
                  Visualize your task progress with interactive charts and stay motivated as you complete goals.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action (CTA) Section */}
      <Box sx={{ backgroundColor: 'secondary.main', color: '#fff', padding: '40px 0' , marginTop: 5 }}>
        <Container>
          <Typography variant="h4" align="center" sx={{ marginBottom: 4 }}>
            Start Organizing Your Tasks Today!
          </Typography>
          <Box textAlign="center">
            <Button
              variant="contained"
              sx={{ backgroundColor: 'primary.main', color: '#fff', padding: '12px 30px', borderRadius: '5px' }}
              component={Link}
              to="/register"
            >
              Join Now
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
