import { useQuery} from '@tanstack/react-query'
import { getUserProfileRequest } from '../api/user'

export function useProfile(userId, token){
    return useQuery({
        queryKey: ['profile', userId],
        queryFn: () => getUserProfileRequest(token, userId),
        select: (data) => data.data,
        enabled: !!userId && !!token,
        onError: (error) => {
            console.error('Error fetching profile:', error);
            
        }
    })
}