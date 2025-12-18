// GitHub API service module
// Provides functions to fetch user data and repositories from GitHub
import axios from 'axios'

const API_BASE = 'https://api.github.com'
const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY

/**
 * Get authorization headers with optional API key
 * @returns {Object} headers object
 */
const getHeaders = () => {
    const headers = { 'Accept': 'application/vnd.github.v3+json' }
    if (API_KEY) {
        headers['Authorization'] = `token ${API_KEY}`
    }
    return headers
}

/**
 * Fetch a GitHub user profile by username using Axios
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} User profile object
 */
export const fetchUserData = async (username) => {
    if (!username) throw new Error('Username is required')

    try {
        const response = await axios.get(
            `${API_BASE}/users/${encodeURIComponent(username)}`,
            { headers: getHeaders() }
        )
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error('User not found')
        }
        throw new Error(
            error.response
                ? `GitHub API error: ${error.response.status}`
                : 'Network error while contacting GitHub'
        )
    }
}

/**
 * Backwards-compatible wrapper for existing code using fetchGitHubUser
 * Delegates to fetchUserData.
 */
export const fetchGitHubUser = async (username) => {
    return fetchUserData(username)
}

/**
 * Fetch repositories for a GitHub user
 * @param {string} username - GitHub username
 * @param {number} perPage - Results per page (default: 30, max: 100)
 * @returns {Promise<Array>} Array of repository objects
 */
export const fetchUserRepos = async (username, perPage = 30) => {
    if (!username) throw new Error('Username is required')

    const response = await fetch(
        `${API_BASE}/users/${encodeURIComponent(username)}/repos?per_page=${perPage}&sort=updated`,
        { headers: getHeaders() }
    )

    if (!response.ok) {
        throw new Error(`Failed to fetch repos: ${response.status}`)
    }

    return response.json()
}

/**
 * Search for users by query
 * Uses GitHub search users endpoint: https://api.github.com/search/users?q
 * @param {string} query - Search query
 * @param {number} perPage - Results per page (default: 10)
 * @returns {Promise<Object>} Search results object with items array
 */
export const searchUsers = async (query, perPage = 10) => {
    if (!query) throw new Error('Query is required')

    const response = await fetch(
        `${API_BASE}/search/users?q=${encodeURIComponent(query)}&per_page=${perPage}`,
        { headers: getHeaders() }
    )

    if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`)
    }

    return response.json()
}

/**
 * Advanced user search with optional filters and pagination.
 * Wraps GitHub's search/users endpoint and hydrates results with full user details.
 * @param {Object} params
 * @param {string} [params.username]
 * @param {string} [params.location]
 * @param {number|string} [params.minRepos]
 * @param {number} [params.perPage=10]
 * @param {number} [params.page=1]
 * @returns {Promise<Object>} Search results with detailed user info
 */
export const searchUsersAdvanced = async ({
    username,
    location,
    minRepos,
    perPage = 10,
    page = 1,
} = {}) => {
    const parts = []

    if (username && username.trim()) {
        parts.push(`${username.trim()} in:login`)
    }

    if (location && location.trim()) {
        parts.push(`location:${location.trim()}`)
    }

    if (minRepos !== undefined && minRepos !== null && `${minRepos}`.trim() !== '') {
        const parsed = Number(minRepos)
        if (!Number.isNaN(parsed) && parsed > 0) {
            parts.push(`repos:>=${parsed}`)
        }
    }

    const query = parts.join(' ').trim()

    if (!query) {
        throw new Error('At least one search criteria (username, location or minimum repos) is required')
    }

    const url = `${API_BASE}/search/users?q=${encodeURIComponent(
        query,
    )}&per_page=${perPage}&page=${page}`

    const response = await fetch(url, { headers: getHeaders() })

    if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`)
    }

    const json = await response.json()

    const itemsWithDetails = await Promise.all(
        (json.items || []).map(async (item) => {
            try {
                const detail = await fetchUserData(item.login)
                return { ...item, ...detail }
            } catch {
                return item
            }
        }),
    )

    return {
        ...json,
        items: itemsWithDetails,
    }
}

/**
 * Get rate limit information for GitHub API
 * @returns {Promise<Object>} Rate limit object
 */
export const getRateLimit = async () => {
    const response = await fetch(
        `${API_BASE}/rate_limit`,
        { headers: getHeaders() }
    )

    if (!response.ok) {
        throw new Error('Failed to fetch rate limit')
    }

    return response.json()
}
