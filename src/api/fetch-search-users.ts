import { api } from "./api";

export const fetchSearchUsers = async (searchField: string) => {
  const { data } = await api.get<{ items: User[] }>("/search/users", {
    params: { q: searchField },
  });
  return data.items;
};

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
}
