import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box"

export default function Loading() {
    return (
        <Container sx={{ mt: 3 }}>
            <Box sx={{
                height: "300px",
                width: "100%",
                background: "#f7f7f7",
                padding: "20px",
                borderRadius: "5px",
                display: "flex",
                gap: "50px"
            }}>
                <div style={{ width: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "50px" }}>
                        <Skeleton animation="wave" variant="circular" width={50} height={50} />
                        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                            <Skeleton
                                animation="wave"
                                height={15}
                                width="20%"
                                style={{ marginBottom: 6 }}
                            />
                            <Skeleton
                                animation="wave"
                                height={15}
                                width="50%"
                                style={{ marginBottom: 6 }}
                            />
                        </div>

                    </div>
                    <Skeleton variant="rectangular" width="100%">
                        <div style={{ height: "150px" }} />
                    </Skeleton>
                </div>
                <div style={{ width: "300px", display: "flex", alignItems: "center" }}>
                    <Skeleton variant="rectangular" width={250} height={250} />

                </div>
            </Box>
            <Box sx={{ mt: 3 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Skeleton variant="rectangular" width={80} height={35} />
                    <div style={{ display: "flex", gap: "15px" }}>
                        <Skeleton variant="rectangular" width={50} height={15} />
                        <Skeleton variant="rectangular" width={50} height={15} />
                    </div>
                </div>
                <Skeleton sx={{ mt: 2 }} variant="rectangular" width={"100%"} height={35} />
            </Box>
            <Box sx={{ mt: 3 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "50px" }}>
                    <div style={{ width: "150px" }}>
                        <Skeleton animation="wave" variant="circular" width={150} height={150} />
                    </div>
                    <div style={{ display: "flex", gap: "20px", width: "100%", flexDirection: "column" }}>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Skeleton animation="wave" variant="circular" width={50} height={50} />
                            <Skeleton variant="rectangular" width={"100%"} height={50} />
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Skeleton animation="wave" variant="circular" width={50} height={50} />
                            <Skeleton variant="rectangular" width={"100%"} height={50} />
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Skeleton animation="wave" variant="circular" width={50} height={50} />
                            <Skeleton variant="rectangular" width={"100%"} height={50} />
                        </div>

                    </div>
                </div>
            </Box>

        </Container>
    )
}