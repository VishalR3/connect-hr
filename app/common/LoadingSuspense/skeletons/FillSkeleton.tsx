import { Skeleton } from "@mui/material";

export default function FillSkeleton({
  width = "100%",
  height = 50,
  ...rest
}: any) {
  return <Skeleton variant="rounded" width={width} height={height} {...rest} />;
}
