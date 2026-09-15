import PropTypes from 'prop-types'

// Editorial diagrams describe the project theme; they are not product screenshots.
export default function ProjectVisual({ kind, className = '' }) {
  return (
    <div
      className={`project-visual visual-${kind} ${className}`}
      aria-hidden="true"
    >
      {kind === 'maths' && (
        <svg viewBox="0 0 600 400">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="300" cy="200" r="123" />
            <circle cx="300" cy="200" r="80" />
            <path d="M100 200H500M300 35V365M177 200L300 77L423 200L300 323Z" />
            <path d="M177 200L300 323L300 77L423 200Z" opacity=".35" />
          </g>
          <circle cx="300" cy="77" r="5" fill="currentColor" />
          <text x="48" y="56" className="visual-small">
            FIG. 01 / CONNECTIONS
          </text>
          <text x="470" y="352" className="visual-equation">
            π
          </text>
        </svg>
      )}
      {kind === 'systems' && (
        <svg viewBox="0 0 600 400">
          <g fill="none" stroke="currentColor">
            <path d="M300 155V220M130 220H470M130 220V260M300 220V260M470 220V260" />
            <rect x="222" y="80" width="156" height="75" rx="2" />
            {[70, 240, 410].map((x) => (
              <rect key={x} x={x} y="260" width="120" height="58" rx="2" />
            ))}
          </g>
          <g fill="currentColor" textAnchor="middle" className="visual-small">
            <text x="300" y="122">
              CONTROL PLANE
            </text>
            <text x="130" y="294">
              SERVER 01
            </text>
            <text x="300" y="294">
              SERVER 02
            </text>
            <text x="470" y="294">
              SERVER 03
            </text>
          </g>
          <circle cx="300" cy="220" r="5" fill="currentColor" />
          <text x="40" y="40" className="visual-small">
            FIG. 02 / COORDINATION
          </text>
        </svg>
      )}
      {kind === 'habits' && (
        <svg viewBox="0 0 600 400">
          <circle
            cx="300"
            cy="192"
            r="114"
            fill="none"
            stroke="currentColor"
            opacity=".15"
            strokeWidth="2"
          />
          <path
            d="M300 78A114 114 0 1 1 192 229"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <text x="300" y="215" textAnchor="middle" className="visual-timer">
            25:00
          </text>
          <text x="300" y="246" textAnchor="middle" className="visual-small">
            ONE THING AT A TIME
          </text>
          <text x="40" y="40" className="visual-small">
            FIG. 03 / FOCUS
          </text>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <circle
              key={i}
              cx={240 + i * 20}
              cy="351"
              r="4"
              fill="currentColor"
              opacity={i < 4 ? 1 : 0.18}
            />
          ))}
        </svg>
      )}
      {kind === 'terminal' && (
        <svg viewBox="0 0 600 400">
          <g fill="none" stroke="currentColor" opacity=".5">
            <rect x="55" y="65" width="490" height="270" rx="4" />
            <path d="M55 103H545" />
          </g>
          <g fill="currentColor" className="visual-small">
            <text x="80" y="90">
              STOCK CHECKER / CLI
            </text>
            <text x="86" y="157">
              $ monitor --watch
            </text>
            <text x="86" y="203">
              01 HTTP REQUEST
            </text>
            <text x="86" y="240">
              02 BROWSER FALLBACK
            </text>
            <text x="86" y="277">
              03 CHECK AGAIN _
            </text>
          </g>
        </svg>
      )}
      {kind === 'distribution' && (
        <svg viewBox="0 0 600 400">
          <g stroke="currentColor" fill="none">
            <path d="M65 320H535M300 65V340" opacity=".25" />
            <path
              d="M65 319C200 319 216 80 300 80S400 319 535 319"
              strokeWidth="2"
            />
            <path
              d="M65 319C170 319 220 175 300 175S430 319 535 319"
              strokeDasharray="5 5"
            />
          </g>
          <text x="40" y="40" className="visual-small">
            FIG. 05 / DISTRIBUTIONS
          </text>
          <text x="300" y="370" textAnchor="middle" className="visual-small">
            SAME MEAN. DIFFERENT SPREAD.
          </text>
        </svg>
      )}
    </div>
  )
}
ProjectVisual.propTypes = {
  kind: PropTypes.oneOf([
    'maths',
    'systems',
    'habits',
    'terminal',
    'distribution',
  ]).isRequired,
  className: PropTypes.string,
}
