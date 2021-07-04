import { RouteProps, Route as RouteDOM, Redirect } from 'react-router-dom'

import { useAuth } from '../hook/useAuth'

interface UserProtectRouteProps extends RouteProps {
  component: React.ComponentType
}

export function UserProtectRoute({ component: Component, ...rest }: UserProtectRouteProps) {
  const { user } = useAuth()

  return (
    <RouteDOM
      {...rest}
      render={({ location }) =>
        !!user ? (
          <Component />
        ) : (
          <Redirect
            push
            to={{
              pathname: '/',
              state: {
                from: location
              }
            }}
          />
        )
      }
    />
  )
}
