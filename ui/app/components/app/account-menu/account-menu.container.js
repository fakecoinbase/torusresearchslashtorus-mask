import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import {
  toggleAccountMenu,
  showAccountDetail,
  hideSidebar,
  lockMetamask,
  hideWarning,
} from '../../../store/actions'
import {
  getAddressConnectedDomainMap,
  getMetaMaskAccountsOrdered,
  getMetaMaskKeyrings,
  getOriginOfCurrentTab,
  getSelectedAddress,
  getUserDetails
} from '../../../selectors'
import AccountMenu from './account-menu.component'

/**
 * The min amount of accounts to show search field
 */
const SHOW_SEARCH_ACCOUNTS_MIN_COUNT = 5

function mapStateToProps (state) {
  const { metamask: { isAccountMenuOpen } } = state
  const accounts = getMetaMaskAccountsOrdered(state)
  console.log(accounts)
  const origin = getOriginOfCurrentTab(state)
  const selectedAddress = getSelectedAddress(state)
  const userInfo = getUserDetails(state)
  return {
    isAccountMenuOpen,
    addressConnectedDomainMap: getAddressConnectedDomainMap(state),
    originOfCurrentTab: origin,
    selectedAddress: selectedAddress,
    userInfo: userInfo,
    keyrings: getMetaMaskKeyrings(state),
    accounts,
    shouldShowAccountsSearch: accounts.length >= SHOW_SEARCH_ACCOUNTS_MIN_COUNT,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    toggleAccountMenu: () => dispatch(toggleAccountMenu()),
    getUserDetails: () => dispatch(getUserDetails()),
    showAccountDetail: (address) => {
      dispatch(showAccountDetail(address))
      dispatch(hideSidebar())
      dispatch(toggleAccountMenu())
    },
    lockMetamask: () => {
      dispatch(lockMetamask())
      dispatch(hideWarning())
      dispatch(hideSidebar())
      dispatch(toggleAccountMenu())
    },
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(AccountMenu)
