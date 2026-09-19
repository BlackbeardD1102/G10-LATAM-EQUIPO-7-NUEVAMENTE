from fastapi.testclient import TestClient


def test_upload_file(client: TestClient, api_prefix: str) -> None:
    response = client.post(
        f"{api_prefix}/files/upload",
        files={"file": ("notas de prueba.txt", b"contenido", "text/plain")},
    )
    assert response.status_code == 201

    body = response.json()
    assert body["original_filename"] == "notas de prueba.txt"
    assert body["size_bytes"] == len(b"contenido")
    # El nombre almacenado queda saneado (sin espacios).
    assert " " not in body["filename"]


def test_upload_requires_file(client: TestClient, api_prefix: str) -> None:
    response = client.post(f"{api_prefix}/files/upload")
    assert response.status_code == 422
    assert response.json()["errors"][0]["field"] == "file"
