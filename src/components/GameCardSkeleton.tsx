import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const GameCardSkeleton = () => {
  return (
    <Card h="100%" overflow="hidden" borderRadius="xl">
      <Skeleton w="100%" aspectRatio={3 / 2} />
      <CardBody px={4} pt={3} pb={4}>
        <Skeleton h="24px" w="40%" mb={2} borderRadius="md" />
        <SkeletonText noOfLines={2} spacing={2} skeletonHeight="4" />
      </CardBody>
    </Card>
  );
};

export default GameCardSkeleton;
