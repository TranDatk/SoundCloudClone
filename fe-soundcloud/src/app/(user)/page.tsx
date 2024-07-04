import MainSlider from "@/components/main/main.slider";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Divider from '@mui/material/Divider';
import HeadBanner from "@/components/banner/head.banner";

export default async function HomePage() {

  const session = await getServerSession(authOptions);

  const resPop = await sendRequest<IBackendRes<ITrack[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}tracks/top?limit=6`,
    method: "POST",
    body: { genre: "POP" }
  })


  // const resChill = await sendRequest<IBackendRes<ITrack[]>>({
  //   url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/top/`,
  //   method: "POST",
  //   body: { genre: "chill" }
  // })

  return (
    <Container>
      <HeadBanner />
      <MainSlider
        tracks={resPop?.data ?? []}
        title="Top Pop Tracks"
      />
      <Divider />
      {/* <MainSlider
        tracks={resChill?.results ?? []}
        title="Top Chill Tracks"
      /> */}
    </Container>
  );
}
