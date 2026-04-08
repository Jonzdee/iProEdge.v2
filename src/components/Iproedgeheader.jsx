import React from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600&display=swap');

  .ipe-top-bar {
    background: #1A1A2E;
    padding: 7px 0;
    border-bottom: 2px solid #1565C0;
    font-family: 'Barlow', sans-serif;
  }
  .ipe-top-bar-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ipe-top-bar-left {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .ipe-top-link {
    color: #A0A8C0;
    font-size: 12px;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
  }
  .ipe-dot {
    width: 5px;
    height: 5px;
    background: #1E88E5;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
  }
  .ipe-call-box {
    background: white;
    border-radius: 4px;
    padding: 4px 16px;
    text-align: center;
    line-height: 1.25;
  }
  .ipe-call-label {
    font-size: 10px;
    color: #555;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .ipe-call-num {
    font-size: 15px;
    font-weight: 700;
    color: #0D47A1;
    font-family: 'Barlow Condensed', sans-serif;
    letter-spacing: 0.3px;
  }

  .ipe-promo-banner {
    background: linear-gradient(108deg, #0D2B6E 0%, #1565C0 45%, #1E88E5 80%, #42A5F5 100%);
    overflow: hidden;
    position: relative;
    min-height: 80px;
    display: flex;
    align-items: center;
    font-family: 'Barlow', sans-serif;
  }
  .ipe-promo-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 14px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: relative;
    z-index: 1;
  }
  .ipe-promo-eyebrow {
    font-size: 10px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.68);
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 2px;
  }
  .ipe-promo-headline {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 42px;
    font-weight: 900;
    color: white;
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: -1px;
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.18);
  }
  .ipe-promo-headline span {
    color: #FFD54F;
  }
  .ipe-promo-watermark {
    position: absolute;
    right: 130px;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 68px;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.06);
    letter-spacing: -4px;
    text-transform: uppercase;
    user-select: none;
    pointer-events: none;
    white-space: nowrap;
    z-index: 0;
  }
  .ipe-promo-cta {
    background: white;
    color: #0D47A1;
    border: none;
    padding: 10px 24px;
    font-weight: 700;
    font-size: 12px;
    border-radius: 4px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: 'Barlow', sans-serif;
    white-space: nowrap;
    flex-shrink: 0;
    transition: background 0.2s, transform 0.15s;
  }
  .ipe-promo-cta:hover {
    background: #FFD54F;
    transform: scale(1.03);
  }
`;

export default function IProEdgeHeader() {
    return (
        <>
            <style>{styles}</style>

            {/* TOP BAR */}
            <div className="ipe-top-bar">
                <div className="ipe-top-bar-inner">
                    <div className="ipe-top-bar-left">
                        <a href="#" className="ipe-top-link">
                            <span className="ipe-dot" /> Become a Partner
                        </a>
                        <a href="#" className="ipe-top-link">
                            <span className="ipe-dot" /> Track Order
                        </a>
                        <a href="#" className="ipe-top-link">
                            <span className="ipe-dot" /> Help Center
                        </a>
                    </div>
                    <div className="ipe-call-box">
                        <div className="ipe-call-label">Call for Deals</div>
                        <div className="ipe-call-num">08063856166</div>
                    </div>
                </div>
            </div>


        </>
    );
}