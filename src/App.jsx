import { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './components/Header'
import Footer from './components/Footer'
import SiteRoutes from './components/SiteRoutes'
class PageErrorBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed)
      return (
        <section className="page-intro">
          <h1 className="display page-title">Something went wrong.</h1>
          <p>Please reload the page or return to the homepage.</p>
          <a className="button" href="/">
            Return home ↗
          </a>
        </section>
      )
    return this.props.children
  }
}
PageErrorBoundary.propTypes = { children: PropTypes.node }
export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="shell" tabIndex={-1}>
        <PageErrorBoundary>
          <SiteRoutes />
        </PageErrorBoundary>
      </main>
      <Footer />
    </>
  )
}
