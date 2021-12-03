/* <Input
              inputStyle={styles.input}
              inputContainerStyle={styles.inputContainer}
              keyboardType="default"
              ref="firstName"
              // containerStyle={{ marginTop: 15 }}
              returnKeyType="next"
              placeholder="First Name"
              placeholderTextColor="#1D0C47"
              value={this.state.firstName}
              onChangeText={value => this.setState({firstName: value})}
              // errorMessage={this.state.emailError}
              onEndEditing={event => event.nativeEvent.text.trim()} // remove leading/traling whitepaces
              // onSubmitEditing={() => this.refs.formInputPassword.focus()}
            />

            <Input
              inputStyle={styles.input}
              inputContainerStyle={styles.inputContainer}
              keyboardType="default"
              ref="lastName"
              // containerStyle={{ marginTop: 15 }}
              returnKeyType="next"
              placeholder="Last Name"
              placeholderTextColor="#1D0C47"
              value={this.state.lastName}
              onChangeText={value => this.setState({lastName: value})}
              // errorMessage={this.state.emailError}
              onEndEditing={event => event.nativeEvent.text.trim()} // remove leading/traling whitepaces
              // onSubmitEditing={() => this.refs.formInputPassword.focus()}
            />

            <Input
              inputStyle={styles.input}
              inputContainerStyle={styles.inputContainer}
              keyboardType="email-address"
              ref="email"
              // containerStyle={{ marginTop: 15 }}
              returnKeyType="next"
              placeholder="Email Address"
              placeholderTextColor="#1D0C47"
              value={this.state.email}
              onChangeText={value => this.setState({email: value})}
              errorMessage={this.state.emailError}
              onEndEditing={event => event.nativeEvent.text.trim()} // remove leading/traling whitepaces
              // onSubmitEditing={() => this.refs.formInputPassword.focus()}
            /> */}

            {/* <Input
              inputStyle={styles.input}
              inputContainerStyle={styles.inputContainer}
              keyboardType="phone-pad"
              ref="phone"
              // containerStyle={{ marginTop: 15 }}
              returnKeyType="next"
              placeholder="Phone Number"
              placeholderTextColor="#1D0C47"
              value={this.state.phone}
              onChangeText={value => this.setState({phone: value})}
              // errorMessage={this.state.emailError}
              onEndEditing={event => event.nativeEvent.text.trim()} // remove leading/traling whitepaces
              // onSubmitEditing={() => this.refs.formInputPassword.focus()}
            />

            <Input
              inputStyle={styles.input}
              inputContainerStyle={styles.inputContainer}
              keyboardType="password"
              secureTextEntry={true}
              ref="password"
              // containerStyle={{ marginTop: 15 }}
              returnKeyType="next"
              placeholder="Password"
              placeholderTextColor="#1D0C47"
              value={this.state.password}
              onChangeText={value => this.setState({password: value})}
              errorMessage={this.state.emailError}
              onEndEditing={event => event.nativeEvent.text.trim()} // remove leading/traling whitepaces
              // onSubmitEditing={() => this.refs.formInputPassword.focus()}
            />

            <Input
              inputStyle={styles.input}
              inputContainerStyle={styles.inputContainer}
              keyboardType="default"
              secureTextEntry={true}
              ref="confirmPassword"
              // containerStyle={{ marginTop: 15 }}
              returnKeyType="next"
              placeholder="Re-enter Password"
              placeholderTextColor="#1D0C47"
              value={this.state.confirmPassword}
              onChangeText={value => this.setState({confirmPassword: value})}
              // errorMessage={this.state.emailError}
              onEndEditing={event => event.nativeEvent.text.trim()} // remove leading/traling whitepaces
              // onSubmitEditing={() => this.refs.formInputPassword.focus()}
            /> */}