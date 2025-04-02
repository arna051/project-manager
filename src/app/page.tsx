import { CommonApps } from "@/components/Common";
import { Notes } from "@/components/Notes";
import { Profile } from "@/components/Profile";
import { Projects } from "@/components/Projects";
import { ProjectsCategories } from "@/components/ProjectsCategories";
import { RecentRepos } from "@/components/Recent";
import { Repos } from "@/components/Repos";
import { SSHTunnels } from "@/components/Ssh";
import { Todo } from "@/components/Todo";
import { Wrapper } from "@/components/Wrapper";
import { Toaster } from 'sonner';

export default function Home() {
  return (
    <Wrapper>
      <Profile />
      <RecentRepos />
      <Todo />
      <CommonApps />
      <ProjectsCategories />
      <SSHTunnels />
      <Notes />
      <Projects />
      <Repos />
      <Toaster position="top-center" duration={1e4} theme="dark" />
    </Wrapper>
  );
}
