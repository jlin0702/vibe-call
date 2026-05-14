use livekit_api::access_token::{AccessToken, AccessTokenError, VideoGrants};
use std::env;

/// Generate a LiveKit access token for a participant to join a room.
///
/// # Security
/// - API key and secret are read from environment variables (never bundled).
/// - Tokens are scoped to a single room with join-only permissions.
/// - Per AGENTS.md: encryption keys stay local to the client.
#[tauri::command]
pub async fn generate_token(room: String, identity: String) -> Result<String, String> {
    let api_key = env::var("LIVEKIT_API_KEY")
        .map_err(|_| "LIVEKIT_API_KEY environment variable is not set".to_string())?;
    let api_secret = env::var("LIVEKIT_API_SECRET")
        .map_err(|_| "LIVEKIT_API_SECRET environment variable is not set".to_string())?;

    let token = AccessToken::with_api_key(&api_key, &api_secret)
        .with_identity(&identity)
        .with_name(&identity)
        .with_grants(VideoGrants {
            room_join: true,
            room: room.clone(),
            ..Default::default()
        })
        .to_jwt()
        .map_err(|e: AccessTokenError| format!("Failed to generate token: {}", e))?;

    Ok(token)
}
