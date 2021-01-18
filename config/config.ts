// All of the route values in here need to be kept in sync with the names of the actual directories
// and files.

export enum Routes {
    Home = '/',
    Projects = '/projects',
    Blog = '/blog',
}

export enum DynamicRoutes {
    ProjectPostRoute = 'project-post-name',
    BlogPostRoute = 'blog-post-name',
}

// Some CSS classes (see: FlairText) rely on these values.
// So try to make any changes here backwards compatible.
export enum Flair {
    BrownU = 'brownU',
    Orbyt = 'orbyt',
    Projects = 'projects',
    Blog = 'blog',
}
