"use client";

import Layout from "@/components/Layout";
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";
import Banner from "@/components/Banner";

export default function Home() {
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    if (!price || Number(price) < 100000 || !description.trim()) {
      setError(
        "Por favor ingresa un precio mayor o igual a $100,000 y una descripción."
      );
      return;
    }
    setError("");
    setLoading(true);

    let attempts = 0;
    let res, data;
    while (attempts < 3) {
      try {
        res = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price: Number(price),
            description: description.trim(),
          }),
        });
        data = await res.json();
        if (res.ok) break;
      } catch (error) {
        // continue to retry
        console.error("Error en la solicitud:", error);
        setError("Error al publicar el anuncio. Intentando de nuevo...");
      }
      attempts++;
    }

    if (!res || !res.ok) {
      setError(data?.error || "Error al publicar el anuncio.");
    } else {
      setSuccess(true);
      console.log("Anuncio publicado:", data);
      setScreenshot(data?.data?.evidence?.screenshot || null);
      setOpenModal(true);
    }
    setLoading(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSuccess(false);
    setPrice("");
    setDescription("");
    setScreenshot(null);
  };

  return (
    <Layout>
      <Banner isLoading={loading} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 6,
        }}
      >
        <Paper elevation={3} sx={{ p: 4, maxWidth: 450, width: "100%" }}>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Publica tu anuncio
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            mb={3}
          >
            Ingresa el precio y una descripción detallada para publicar tu
            anuncio de seminuevo.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {error && <Alert severity="error">{error}</Alert>}
            {success && (
              <Alert severity="success">¡Anuncio publicado exitosamente!</Alert>
            )}
            <TextField
              label="Precio del anuncio"
              type="number"
              variant="outlined"
              fullWidth
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              InputProps={{ inputProps: { min: 100000 } }}
              helperText="El precio mínimo es $100,000"
              disabled={loading}
            />
            <TextField
              label="Descripción del anuncio"
              variant="outlined"
              fullWidth
              multiline
              minRows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? "Publicando..." : "Publicar"}
            </Button>
          </Box>
        </Paper>
      </Box>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>¡Anuncio publicado exitosamente!</DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Typography mb={2}>
            Este es el comprobante de tu publicación. Puedes guardar la imagen
            como evidencia.
          </Typography>
          {screenshot && (
            <Box
              component="img"
              src={`${screenshot}`}
              alt="Comprobante de publicación"
              sx={{
                maxWidth: "100%",
                maxHeight: 300,
                borderRadius: 2,
                boxShadow: 2,
                mb: 2,
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          {screenshot && (
            <Button
              component="a"
              href={`${screenshot}`}
              download="comprobante.png"
              color="secondary"
              variant="outlined"
            >
              Descargar imagen
            </Button>
          )}
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="primary"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
