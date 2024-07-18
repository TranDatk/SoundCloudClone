import MainSlider from "@/components/main/main.slider";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Divider from '@mui/material/Divider';
import HeadBanner from "@/components/banner/head.banner";
import VerifyComponent from "@/components/verify/check.verify.component";
import PreniumModal from "@/components/main/prenium.modal";

export default async function HomePage() {
  const resPop = await sendRequest<IBackendRes<ITrack[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}tracks/top?limit=6`,
    method: "POST",
    body: { genre: "POP" }
  });

  const resElec = await sendRequest<IBackendRes<ITrack[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}tracks/top?limit=6`,
    method: "POST",
    body: { genre: "Electronic" }
  });

  const resBallad = await sendRequest<IBackendRes<ITrack[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}tracks/top?limit=6`,
    method: "POST",
    body: { genre: "Ballad" }
  });

  return (
    <Container>
      <VerifyComponent />
      <PreniumModal />
      <HeadBanner />
      <MainSlider
        tracks={resPop?.data ?? []}
        title="Top Pop Tracks"
      />
      <Divider />
      <MainSlider
        tracks={resElec?.data ?? []}
        title="Top Electronic Tracks"
      />
      {(resBallad?.data?.length ?? 0 > 4) ? <MainSlider
        tracks={resBallad?.data ?? []}
        title="Top Ballad Tracks"
      /> : <></>}
    </Container>
  );
}
