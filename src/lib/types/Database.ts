export interface UserProfile {
	id: string;
    club_name: string,
    dob: string,
    full_name: string,
    handicap_index: string,
    phone: string,
    postal_code: string,
    verified: boolean,
    email: string,
    golf_id: string,
    gender: string,
    bio: string,
    user_images_url: string,
    avatar_url: string,
    other_gender: string | null
}

export interface PublicUserProfile {
    id: string,
    club_name: string,
    handicap_index: string,
    full_name: string,
    golf_id: string,
    verified: boolean,
    user_images_url: string,
    avatar_url: string,
    dob: string,
    bio: string,
    gender: string,
    other_gender: string
}

export interface FriendRequest {
    avatar_url: string,
    receiver_id: string,
    sender_id: string,
    context: string,
    sender_name: string,
    // Catchall for extra properties
    [key: string]: string
}