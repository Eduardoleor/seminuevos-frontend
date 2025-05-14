import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Fade, Stack } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StarIcon from "@mui/icons-material/Star";
import SecurityIcon from "@mui/icons-material/Security";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

type BannerProps = {
  isLoading: boolean;
};

const advantages = [
  {
    text: "Mayor visibilidad para tu auto.",
    icon: <VisibilityIcon color="inherit" />,
  },
  {
    text: "Llegas a más compradores potenciales.",
    icon: <TrendingUpIcon color="inherit" />,
  },
  {
    text: "Publicación rápida y sencilla.",
    icon: <FlashOnIcon color="inherit" />,
  },
  {
    text: "Aumenta tus posibilidades de venta.",
    icon: <EmojiEventsIcon color="inherit" />,
  },
  {
    text: "Destaca las características de tu vehículo.",
    icon: <StarIcon color="inherit" />,
  },
  {
    text: "Transacciones seguras y confiables.",
    icon: <SecurityIcon color="inherit" />,
  },
  {
    text: "Ofertas exclusivas para vendedores.",
    icon: <LocalOfferIcon color="inherit" />,
  },
  {
    text: "Soporte personalizado durante tu venta.",
    icon: <SupportAgentIcon color="inherit" />,
  },
];

export default function Banner({ isLoading }: BannerProps) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % advantages.length);
      }, 2200);
    } else {
      setIndex(0);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "primary.dark",
        color: "primary.contrastText",
        py: 2,
        px: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 64,
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Fade in={isLoading} timeout={500} key={index}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ width: "100%", justifyContent: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "primary.light",
              color: "primary.dark",
              borderRadius: "50%",
              width: 40,
              height: 40,
              justifyContent: "center",
              boxShadow: 1,
            }}
          >
            {advantages[index].icon}
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              textAlign: "center",
              fontSize: { xs: "1rem", sm: "1.15rem" },
              letterSpacing: 0.2,
            }}
          >
            {advantages[index].text}
          </Typography>
        </Stack>
      </Fade>
    </Box>
  );
}
