import { Box, Typography } from "@mui/material";
import React from "react";

function Coupon() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Box
                sx={{
                    backgroundColor: "#ffeef2",
                    height: "4.375rem",
                    width: "80%", //put 100% after adding the grids
                    borderRadius: "0.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "1rem",
                            color: "#ee1770",
                            marginRight: "1rem",
                        }}
                    >
                        Super discount for your{" "}
                        <span style={{ textDecoration: "underline", fontWeight: "600" }}>
                            first purchase.
                        </span>
                    </Typography>
                    <Typography
                        style={{
                            padding: "0.5rem",
                            borderRadius: "2rem",
                            border: "1px dashed #ee1770",
                            marginRight: "1rem",
                        }}
                    >
                        Free25BAC
                    </Typography>
                    <Typography
                        style={{
                            color: "#abadc6",
                            fontSize: "0.9rem",
                        }}
                    >
                        Use discount code in checkout
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default Coupon;
