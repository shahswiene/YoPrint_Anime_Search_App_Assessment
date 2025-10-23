import { Card, CardContent, Skeleton, Box } from '@mui/material';

function AnimeCardSkeleton() {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Skeleton variant="rectangular" height={300} animation="wave" />
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Skeleton variant="text" width="80%" height={32} animation="wave" />
        <Skeleton variant="text" width="60%" height={32} animation="wave" />
        <Box sx={{ display: 'flex', gap: 1, mt: 1, mb: 1 }}>
          <Skeleton variant="rectangular" width={60} height={24} animation="wave" />
          <Skeleton variant="rectangular" width={80} height={24} animation="wave" />
        </Box>
        <Skeleton variant="text" width="40%" animation="wave" />
        <Skeleton variant="text" width="100%" animation="wave" />
        <Skeleton variant="text" width="100%" animation="wave" />
        <Skeleton variant="text" width="80%" animation="wave" />
      </CardContent>
    </Card>
  );
}

export default AnimeCardSkeleton;
